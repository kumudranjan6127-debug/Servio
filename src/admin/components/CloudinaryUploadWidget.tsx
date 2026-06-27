import { useEffect, useRef, useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Upload } from 'lucide-react';

interface CloudinaryUploadWidgetProps {
  onSuccess: (url: string) => void;
  className?: string;
}

export function CloudinaryUploadWidget({ onSuccess, className }: CloudinaryUploadWidgetProps) {
  const cloudinaryRef = useRef<any>();
  const widgetRef = useRef<any>();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const scriptId = 'cloudinary-widget-script';
    const existingScript = document.getElementById(scriptId);

    const onScriptLoad = () => {
      setIsLoaded(true);
      // @ts-ignore
      cloudinaryRef.current = window.cloudinary;
      
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

      if (!cloudName || !uploadPreset) {
        console.error("Cloudinary environment variables are missing.");
        return;
      }

      widgetRef.current = cloudinaryRef.current.createUploadWidget(
        {
          cloudName: cloudName,
          uploadPreset: uploadPreset,
          sources: ['local', 'url', 'camera'],
          multiple: false,
          maxFiles: 1,
        },
        function (error: any, result: any) {
          if (!error && result && result.event === 'success') {
            onSuccess(result.info.secure_url);
          }
        }
      );
    };

    if (!existingScript) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://upload-widget.cloudinary.com/global/all.js';
      script.async = true;
      script.onload = onScriptLoad;
      document.body.appendChild(script);
    } else {
      if ((window as any).cloudinary) {
        onScriptLoad();
      } else {
        existingScript.addEventListener('load', onScriptLoad);
      }
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Button 
      type="button" 
      variant="secondary" 
      className={className}
      disabled={!isLoaded}
      onClick={() => widgetRef.current?.open()}
    >
      <Upload className="mr-2 h-4 w-4" aria-hidden="true" />
      Upload Image
    </Button>
  );
}
