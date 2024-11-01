'use client'

import { lusitana } from '@/app/fonts/fonts'
import { SignInFormSchema, SignInFormType } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRightIcon, AtSign, KeyRoundIcon } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { TextField } from '../molecules'
import { Form } from '../ui'
import { Button } from '../ui/button'

export const SignInForm = () => {
	const form = useForm<SignInFormType>({
		resolver: zodResolver(SignInFormSchema),
		defaultValues: {
			email: '',
			password: ''
		},
		mode: 'onBlur'
	})

	const { handleSubmit, control, reset } = form
	const onSubmit = async (data: SignInFormType) => {
		console.log(data)
	}

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
					<h1 className={`${lusitana.className} mb-3 text-2xl`}>Please log in to continue.</h1>
					<div className="w-full space-y-4">
						<TextField
							id="email"
							label="Email"
							control={control}
							name="email"
							placeholder="Enter your email address"
							icon={<AtSign size={18} />}
						/>

						<TextField
							id="password"
							type="password"
							label="Password"
							control={control}
							name="password"
							placeholder="Enter password"
							icon={<KeyRoundIcon size={18} />}
						/>
					</div>

					<Button className="mt-4 w-full" aria-disabled={true}>
						Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
					</Button>

					<div className="mt-4 text-center text-sm text-gray-600">
						Don't have an account?{' '}
						<Link href="/signup" className="text-blue-600 hover:underline">
							Create one here
						</Link>
					</div>

					<div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
						{/* {errorMessage && (
            <>
              <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )} */}
					</div>
				</div>
			</form>
		</Form>
	)
}
