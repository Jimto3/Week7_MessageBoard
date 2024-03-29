import { useEffect, useState } from "react";

export default function LikeButton({ handleLike, id, user_id }) {
    const [saturation, setSaturation] = useState(0);
    // if user has liked this image, change saturation
    useEffect(() => {
        checkLiked();
    }, []);
    return (
        <img
            onMouseEnter={checkSaturation}
            onMouseLeave={checkSaturation}
            onClick={handleClick}
            src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/blue-like-button-icon.png"
            style={{
                filter: `saturate(${saturation})`,
                width: `20px`,
                height: "fit-content",
            }}
        />
    );
    function checkSaturation() {
        if (saturation == 0) {
            setSaturation(1);
        } else setSaturation(0);
    }
    async function handleClick() {
        checkSaturation();
        handleLike(saturation, id);
    }

    async function checkLiked() {
        const data = await fetch(
            "https://messageboard-server.onrender.com/getliked",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: user_id }),
            }
        );
        const likedMessages = await data.json();
        likedMessages.map((message) => {
            if (id == message.message_id) {
                checkSaturation();
            }
        });
    }
}
