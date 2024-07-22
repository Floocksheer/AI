import Image from 'next/image';



export const loader = () => {

    return(
        <div className="h-full flex flex-col gap-y-4 item-center justify-center">
           <div className="w-10 h-10 relative animate-spin float-right w-10 logoicon">
            <Image
            alt="logo"
            fill
            src="/logo.png"
            />
           </div>
           <p className="text-sm text-muted-foreground">
            Genious is thinking...
           </p>
        </div>
    );
};