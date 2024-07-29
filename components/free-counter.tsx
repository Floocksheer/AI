interface FreeCounterProps {
    apiLimitCount: number;
}

export const FreeCounter = ({
    apiLimitCount=0
}:FreeCounterProps)=> {
    return(
        <div>
        Free Counter
        </div>
    )
}