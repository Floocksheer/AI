
const AuthLayout    = ({
children
}: {
children: React.ReactNode;
}) => {

    return(

        <main className="bg-[#111827] flex items-center justify-center h-full">
            {children}
        </main>

    );
}

export default AuthLayout;