import { useEffect, useState } from "react";

export default function AddMessage({ user_id }) {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        getCategories();
    }, []);
    return (
        <div>
            {user_id != 0 ? (
                <>
                    <h2>add message:</h2>
                    <form className="addMessage" onSubmit={handleSubmit}>
                        <label>Message: </label>
                        <textarea
                            name="message"
                            placeholder="Message"
                            style={{
                                height: "200px",
                                width: "60%",
                            }}
                        ></textarea>
                        <label>Category:</label>
                        <select
                            name="category"
                            style={{ height: "fit-content" }}
                        >
                            {categories.map((category) => {
                                return (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                );
                            })}
                        </select>
                        <button style={{ height: "fit-content" }}>
                            Submit
                        </button>
                    </form>
                </>
            ) : (
                <h2 style={{ background: "red", width: "fit-content" }}>
                    Please Login to post messages!
                </h2>
            )}
        </div>
    );

    async function getCategories() {
        const data = await fetch(
            "https://messageboard-server.onrender.com/categories"
        );
        const json = await data.json();
        setCategories(json);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const message = event.target.message.value;
        const category = event.target.category.value;
        await fetch("https://messageboard-server.onrender.com/addmessage", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: message,
                category: category,
                id: user_id,
            }),
        });
    }
}
