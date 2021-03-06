import express from 'express';
import {
    getPosts,
    createPost,
    getPost,
    updatePost,
    deletePost,
} from '../services/posts';
import commentRoutes from './comments';

import { PostType } from '../types/PostType';
import { generateResponse } from '../handler/response';

const router = express.Router({ mergeParams: true });

router.get('/', async (req: express.Request, res: express.Response) => {
    const posts = await getPosts();
    res.send(posts).end();
});

router.post('/', async (req: express.Request, res: express.Response) => {
    const newPost = await createPost(req.body);
    res.send(newPost).end();
});

router.get('/:id', async (req: express.Request, res: express.Response) => {
    const post = await getPost(req.params.id);
    if (!post) generateResponse(res, 404);
    res.send(post).end();
});

router.put('/:id', async (req: express.Request, res: express.Response) => {
    const post = await updatePost(req.params.id, req.body as PostType);
    if (!post) generateResponse(res, 404);
    res.send(post).end();
});

router.delete('/:id', async (req: express.Request, res: express.Response) => {
    const post = await deletePost(req.params.postId);
    if (!post) generateResponse(res, 404);
    res.sendStatus(204).end();
});

router.use('/:id/comments', commentRoutes);
export default router;
