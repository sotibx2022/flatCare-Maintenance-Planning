import React from 'react';
import Lottie from 'lottie-react';
import loadingButton from "@/../../public/assets/animations/loadingbutton.json"
const LoadingButton = () => {
    return (
        <div>
            <Lottie
                animationData={loadingButton} // Pass the animation data directly
                loop={true}
                autoplay={true}
            />
        </div>
    );
};
export default LoadingButton;
