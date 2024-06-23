import { useCreatePost } from "@/hooks/use-create-post"
import { Button } from "./ui/button"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "./ui/sheet"
import { postSchema } from "@/lib/validation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { useState } from "react"
import { $axios } from "@/http"
import { toast } from "sonner"
import { postStore } from "@/store/post.store"

function CreatePost() {
    const [loading, setLoading] = useState(false)
    const [picture, setPircture] = useState<File | null>()    
    const { isOpen, onClose } = useCreatePost()
    const {posts, setPosts} = postStore()

    const form = useForm<z.infer<typeof postSchema>>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: "",
            body: "",
        },
    })

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        setPircture(file as File)
    }


    function onSubmit(values: z.infer<typeof postSchema>) {
        setLoading(true)
        if(!picture) return alert('Please select a picture')

        const formData = new FormData()
        formData.append('title', values.title)
        formData.append('body', values.body)
        formData.append('picture', picture)

        const promise = $axios.post('/post/create', formData).then(res => {
            setPosts([...posts, res.data])
            form.reset()
            setPircture(null)
            onClose()
        }).finally(() => setLoading(false))

        toast.promise(promise, {
            loading: 'Creating post...',
            success: 'Post created successfully',
            error: 'Failed to create post'
        })
    }
    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Create Post</SheetTitle>
                    <SheetDescription>
                        What is on your mind?
                    </SheetDescription>
                </SheetHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-6">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="body"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea disabled={loading} placeholder="description" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div>
                            <Label htmlFor="picture">Picture</Label>
                            <Input type="file" accept="image/*" id="picture" className="bg-secondary mt-2" onChange={onFileChange} />
                        </div>
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button disabled={loading} type="submit">Save changes</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default CreatePost