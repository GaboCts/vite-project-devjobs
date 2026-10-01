import { Lottie } from 'lottie-react'

export function LottieAnimation({height, width, animation}) {

    return (
        <Lottie 
            src={animation}
            style={{
                height,
                width
            }}
            autoplay
            loop
        />
    )
}