import { IPost } from "@/interfaces"
import { Card, CardContent, CardFooter, CardTitle } from "../ui/card"
import { API_URL } from "@/http"
import { Button } from "../ui/button"

const PostCard = ({ post }: { post: IPost }) => {
    const onDelete = () => {}
    return (
        <Card>
            <img src={`${API_URL}/${post.picture}`} alt={post.title} className='rounded-t-md w-full' /> 

            <CardContent className='mt-2'>
				<CardTitle className='line-clamp-1 text-xl'>{post.title}</CardTitle>
				<p className='line-clamp-2 mt-1 text-muted-foreground text-sm'>{post.body}</p>
			</CardContent>
            <CardFooter className='gap-2'>
				<Button variant={'destructive'} className='w-full' onClick={onDelete}>
					Delete
				</Button>
				{/* <Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger asChild>
						<Button className='w-full'>Edit</Button>
					</PopoverTrigger>
					<PopoverContent className='w-96 relative'>
						{isPending && <FillLoading />}
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2 mt-6'>
								<FormField
									control={form.control}
									name='title'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Title</FormLabel>
											<FormControl>
												<Input
													placeholder='Create a blog post'
													className='bg-secondary'
													disabled={isPending}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='body'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Body</FormLabel>
											<FormControl>
												<Textarea
													placeholder='In this article you can improve...'
													className='bg-secondary'
													disabled={isPending}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button type='submit' disabled={isPending}>
									Submit
								</Button>
							</form>
						</Form>
					</PopoverContent>
				</Popover> */}
			</CardFooter>
        </Card>
    )
}

export default PostCard