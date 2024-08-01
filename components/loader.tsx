import Image from 'next/image';



export const loader = () => {

    return(
        <div className="h-full flex flex-col gap-y-4 item-center justify-center" style={{ alignItems: "center" }}>
           <div className="w-20 h-20 relative animate-spin float-right">
            <Image
            alt="logo"
            fill
            src="/logo.png"
            />
           </div>
           <p className="text-sm text-muted-foreground">
            Chevy is thinking...
           </p>
        </div>
    );
};