'use server'

import { IReelResponse, IUserResponse } from '@/interfaces'
import { FetchOptions, fetchService } from '@/lib/http'
import { ReelFormSchemaType, VideoFormType } from '@/schemas'
import { revalidatePath } from 'next/cache'

interface IVideoResponse {
	id: string
	url: string
}

export const updateStreamingVideo = async (videoFormData: VideoFormType): Promise<void> => {
	const API_ENDPOINT = '/streaming'

	const options: FetchOptions = {
		method: 'PUT',
		body: JSON.stringify(videoFormData),
		headers: {
			'Content-Type': 'application/json'
		}
	}

	await fetchService<IVideoResponse>(API_ENDPOINT, options)

	revalidatePath('/streaming')
	revalidatePath('/agnostic/streaming')
}

export const getStreamingVideo = async (): Promise<IVideoResponse | null> => {
	const API_ENDPOINT = `/streaming`

	const options: FetchOptions = {
		method: 'GET',
		next: {
			revalidate: 1
		}
	}

	const [video, error] = await fetchService<IVideoResponse>(API_ENDPOINT, options)

	if (error || !video) return null

	return video
}

export const getUsers = async (params?: Record<string, any>): Promise<IUserResponse | null> => {
	const API_ENDPOINT = `/user`

	const options: FetchOptions = {
		method: 'GET',
		params,
		next: {
			revalidate: 1
		}
	}

	const [users, error] = await fetchService<IUserResponse>(API_ENDPOINT, options)

	if (error || !users) return null

	return users
}

export const getReels = async (params?: Record<string, any>): Promise<IReelResponse[] | null> => {
	const API_ENDPOINT = `/reel`

	const options: FetchOptions = {
		method: 'GET',
		params,
		next: {
			revalidate: 1
		}
	}

	const [videos, error] = await fetchService<IReelResponse[]>(API_ENDPOINT, options)

	if (error || !videos) return null

	return videos
}

export const deleteReel = async (reelId: string): Promise<void> => {
	const API_ENDPOINT = `/reel/${reelId}`

	const options: FetchOptions = {
		method: 'DELETE'
	}

	await fetchService<IReelResponse[]>(API_ENDPOINT, options)

	revalidatePath('/agnostic/videos')
	revalidatePath('/agnostic/reel')
	revalidatePath('/')
}

export const updateReel = async (reelFormData: ReelFormSchemaType): Promise<void> => {
	const API_ENDPOINT = `/reel/${reelFormData.id}`

	const options: FetchOptions = {
		method: 'PUT',
		body: JSON.stringify(reelFormData),
		headers: {
			'Content-Type': 'application/json'
		}
	}

	await fetchService<IVideoResponse>(API_ENDPOINT, options)

	revalidatePath('/agnostic/videos')
	revalidatePath('/agnostic/reel')
	revalidatePath('/')
}

export const createReel = async (reelFormData: ReelFormSchemaType): Promise<void> => {
	const API_ENDPOINT = `/reel/${reelFormData.id}`

	const options: FetchOptions = {
		method: 'POST',
		body: JSON.stringify(reelFormData),
		headers: {
			'Content-Type': 'application/json'
		}
	}

	await fetchService<IVideoResponse>(API_ENDPOINT, options)

	revalidatePath('/agnostic/videos')
	revalidatePath('/agnostic/reel')
	revalidatePath('/')
}

export const revalidateCacheByPath = (paths: string | string[]) => {
	if (Array.isArray(paths)) {
		paths.forEach(path => {
			revalidatePath(path)
		})
	}

	if (typeof paths === 'string') revalidatePath(paths)
}
