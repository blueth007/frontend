
const url = "http://rap2api.taobao.org/app/mock/244447/api/v1/articleList";
 

export const getData = (limited = 0, offset = 10) => fetch(url, {
    body: JSON.stringify({
        authToken: "asdt1120-123-00",
        limited,
        offset
    }),
    headers: {
        //   'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json'
    },
    method: 'POST',
}).then(res => res.json());



const deletedUrl = "http://rap2api.taobao.org/app/mock/244447/api/v1/articleDeleted/"
export const deletedArticle = (id) => fetch(deletedUrl+`${id}`, {
    body: JSON.stringify({
        authToken: "asdt1120-123-00",
        id
    }),
    headers: {
        //   'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json'
    },
    method: 'POST',
}).then(res => res.json());



const articleOneUrl = "http://rap2api.taobao.org/app/mock/244447/api/v1/article/:id"
export const getOneArticle = (id) => fetch(articleOneUrl+`${id}`, {
    body: JSON.stringify({
        authToken: "asdt1120-123-00",
        id
    }),
    headers: {
        //   'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json'
    },
    method: 'POST',
}).then(res => res.json());

const setArticleUrl = "http://rap2api.taobao.org/app/mock/244447/api/v1/articleEdit/:id"
export const setArticle = (id,data) => fetch(setArticleUrl+`${id}`, {
    body: JSON.stringify({
        authToken: "asdt1120-123-00",
        id,
         ...data,
    }),
    headers: {
        //   'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json'
    },
    method: 'POST',
}).then(res => res.json());



