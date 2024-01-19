import { useState } from "react";

export default function LikeButton({ handleLike, id }) {
    const [saturation, setSaturation] = useState(0);
    // if user has liked this image, change saturation
    return (
        <img
            onMouseEnter={checkSaturation}
            onMouseLeave={checkSaturation}
            onClick={handleClick}
            src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/blue-like-button-icon.png"
            style={{ filter: `saturate(${saturation})`, width: `100px` }}
        />
    );
    function checkSaturation() {
        if (saturation == 0) {
            setSaturation(1);
        } else setSaturation(0);
    }
    async function handleClick() {
        checkSaturation();

        // setClicked(true);
        //if saturation = 0, like -= 1, else like += 1
        handleLike(saturation, id);
    }
}
