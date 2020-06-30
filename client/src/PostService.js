/* eslint-disable no-async-promise-executor */

import axios from 'axios';

//will be a proxy later on - not sure what this does yet
const url = 'api/posts/';

class PostService {
	//Get Posts - static = dont have to instantiate a post object to use getPost - don't need new postService.getPost
	/*static getPosts() {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.get(url);
				const data = res.data;
				resolve(
					data.map((post) => ({
						...post,
						createdAt : new Date(post.createdAt)
					}))
				);
			} catch (err) {
				reject(err);
			}
		});
    } */

	static getPosts() {
		return new Promise((resolve, reject) => {
			axios
				.get(url)
				.then((res) => {
					const data = res.data;
					resolve(
						data.map((post) => ({
							...post,
							createdAt : new Date(post.createdAt)
						}))
					);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}

	//Create Post
	static insertPost(text) {
		return axios.post(url, { text });
	}

	//Delete Post
	static deletePost(id) {
		return axios.delete(`${url}${id}`);
	}
}

//export
export default PostService;
