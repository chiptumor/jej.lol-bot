const API_URL = "https://jej.lol";

function getUrl(path) {
    return API_URL + path;
}

export async function getPost(search) {
    const query = finalizeQuery(search);

    const post = await fetch(getUrl("/api/random-post?q=" + query))
        .then(r => r.json());

    if (post.url === "")
        return "no image found";
    if (!post.contentUrl)
        return `unknown error (${ JSON.stringify(post) })`;

    return getUrl(post.contentUrl);
}

function finalizeQuery(query) {
    if (!query) return "id:0..";

    let final = query;

    [ // array of functions to run for each tag
        tag => // glegle
            // dont replace negate tokens
            /* if a negate token has "gle" the search would appear bugged *
             * e.g. "-jingle" --> "-jin glegle"                           *
             * e.g. "-gleep" --> "- glegle ep"                            */
            tag[0] === "-"
                ? tag
                : tag.replace(/(gle)+/g, " glegle ")
    ]
    .forEach(
        func => final = final
            .split(" ")
            .map(func)
            .join(" ")
    );
    
    return final;
}
