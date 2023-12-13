
const mainContainer = document.querySelector(".main_container");

function creationOfPostContent(name, image, body, reaction) {
    const feedItemContainer = document.createElement("div");
    feedItemContainer.className = "feed-item-container";
    const feedUserImage = document.createElement("div");
    feedUserImage.className = "feed-user-image";
    feedUserImage.style.backgroundImage = `url(${image})`;
    const userName = document.createElement("span");
    userName.className = "user-name";
    userName.textContent = name;
    const icon = document.createElement("i");
    icon.className = "icon-verified";
    icon.style.backgroundImage = "url('media/verified.svg')";
    userName.appendChild(icon);
    const feedItemBox = document.createElement("div");
    feedItemBox.className = "feed-item-box";
    const feedItemContent = document.createElement("div");
    feedItemContent.className = "feed-item-content";
    feedItemContent.textContent = body;
    const reactionsBlock = document.createElement("div");
    reactionsBlock.className = "reactions-block";
    const reactionGroup1 = document.createElement("div");
    reactionGroup1.className = "reaction-group";
    const retweetIcon1 = document.createElement("i");
    retweetIcon1.className = "retweet-icon";
    retweetIcon1.style.backgroundImage = "url('media/Reply.svg')";
    const retweetValue1 = document.createElement("div");
    retweetValue1.className = "retweet-value";
    retweetValue1.textContent = Math.floor(Math.random() * 100).toString();
    reactionGroup1.appendChild(retweetIcon1);
    reactionGroup1.appendChild(retweetValue1);

    const reactionGroup2 = document.createElement("div");
    reactionGroup2.className = "reaction-group";

    const retweetIcon2 = document.createElement("i");
    retweetIcon2.className = "retweet-icon";
    retweetIcon2.style.backgroundImage = "url('media/Retweet.svg')";

    const retweetValue2 = document.createElement("div");
    retweetValue2.className = "retweet-value";
    retweetValue2.innerHTML = "<a href='#'>Like</a>";
    retweetValue2.textContent = Math.floor(Math.random() * 100).toString();

    reactionGroup2.appendChild(retweetIcon2);
    reactionGroup2.appendChild(retweetValue2);

    const reactionGroup3 = document.createElement("div");
    reactionGroup3.className = "reaction-group";

    const retweetIcon3 = document.createElement("i");
    retweetIcon3.className = "retweet-icon";
    retweetIcon3.style.backgroundImage = "url('media/React.svg')";

    const retweetValue3 = document.createElement("div");
    retweetValue3.className = "retweet-value";
    retweetValue3.textContent = reaction;
    reactionGroup3.appendChild(retweetIcon3);
    reactionGroup3.appendChild(retweetValue3);


    const singleIcon = document.createElement("i");
    singleIcon.className = "retweet-icon";
    singleIcon.style.backgroundImage = "url('media/Share.svg')";


    reactionsBlock.appendChild(reactionGroup1);
    reactionsBlock.appendChild(reactionGroup2);
    reactionsBlock.appendChild(reactionGroup3);
    reactionsBlock.appendChild(singleIcon);
    feedItemBox.appendChild(userName);
    feedItemBox.appendChild(feedItemContent);
    feedItemBox.appendChild(reactionsBlock);

    feedItemContainer.appendChild(feedUserImage);
    feedItemContainer.appendChild(feedItemBox);
    mainContainer.prepend(feedItemContainer);
}

async function postThePost(event) {
    event.preventDefault();
    const userMessage = document.getElementById("usersMessage").value;

 
    const userId = 1;

    try {
        const response = await fetch("https://dummyjson.com/posts/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: userMessage,
                userId: userId,
            }),
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log("Server Response:", responseData);

            creationOfPostContent(
                "Mister Robot",
                "https://robohash.org/perferendisideveniet.png",
                userMessage,
                0
            );
        } else {
            console.error("Error during post craetion happend:", response.statusText);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

async function postCreation() {
    const response = await fetch("https://dummyjson.com/posts");
    const data = await response.json();
    let neededPosts = data.posts.slice(0, 12);
    for (const post of neededPosts) {
        let userId = post.userId;
        const response = await fetch(`https://dummyjson.com/users/${userId}`);
        const data = await response.json();
   
        const name = data.username;
        const image = data.image;
        const body = post.body;
        const reaction = post.reactions;

        creationOfPostContent(name, image, body, reaction);
    }
}

postCreation();

document
    .getElementById("input_container")
    .addEventListener("submit", postThePost);
