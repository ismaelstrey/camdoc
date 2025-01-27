'use client'
import React, { useRef, useState } from 'react';

export default function Cam() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [images, setImages] = useState<string[]>([]);

    const startCamera = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
            videoRef.current.srcObject = stream;
        }
    };

    const takePhoto = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (videoRef.current) {
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            context?.drawImage(videoRef.current, 0, 0);
            if (images.length < 4) {
                setImages([...images, canvas.toDataURL('image/png')]);
            } else {
                alert('Você já tirou 4 fotos!');
            }
        }
    };

    const deletePhoto = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const uploadPhoto = () => {
        images.forEach(image => {
            console.log('Imagem para upload:', image);
        });
    };

    React.useEffect(() => {
        startCamera();
    }, []);

    return (
        <div className='flex flex-col items-center content-center mt-8'>
            <div className='flex fixed top-4 left-4 p-4 mt-8 gap-8'>


            </div>
            <video height={400} onClick={takePhoto} className='mt-8 h-96' ref={videoRef} autoPlay />

            <div className='flex flex-col w-80'>
                {images.map((image, index) => (
                    <div key={index}>
                        <img src={image} alt={`Foto ${index + 1}`} />
                        <button onClick={() => deletePhoto(index)}>Apagar Foto</button>
                    </div>
                ))}</div>
            <button className='mt-8 flex fixed bottom-4 bg-red-700 text-white rounded-lg p-4' onClick={uploadPhoto}>Fazer Upload</button>
        </div>
    );
}
