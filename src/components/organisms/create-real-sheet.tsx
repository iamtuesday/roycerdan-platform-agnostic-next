'use client'

import { ReelFormSchemaType } from '@/schemas'
import { useSocket } from '@/socket/socket.context'
import { Plus } from 'lucide-react'
import { ReelForm } from '../molecules'
import { Button, CustomSheet } from '../ui'

export const CreateReelSheet = () => {
	const { socket } = useSocket()

	const createReel = (data: ReelFormSchemaType): void => {
		try {
			socket?.emit(
				'reel',
				{
					url: data.url,
					title: data.title,
					description: data.description
				},
				(response: any) => {
					// Callback para manejar la respuesta del servidor
					console.log('Server response:', response)
				}
			)

			// revalidateCacheByPath(['/dashboard/reels', '/reels'])
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<CustomSheet
			title={'Crear un nuevo Reel'}
			trigger={
				<Button variant="outline" className="w-max">
					Crear
					<Plus className="h-4 w-4" />
				</Button>
			}
		>
			{handleOpen => {
				return (
					<ReelForm
						handleOnSubmit={async data => {
							createReel(data)
							handleOpen(false)
						}}
					/>
				)
			}}
		</CustomSheet>
	)
}
