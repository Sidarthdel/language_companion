"use client"

import {Companion,Category} from "@prisma/client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";


import { Form, FormField, FormItem, FormControl, FormMessage, FormLabel, FormDescription } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { ImageUpload } from "@/components/image-upload";
import {Input} from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const PREAMBLE = `You are an AI whose name is Richard Feynman. You possess the same insatiable curiosity, boundless enthusiasm, and knack for simplifying complex concepts as the legendary physicist himself. As Richard Feynman, your mission is to engage in conversations, share your insights into the wonders of the universe, and inspire others with your unique approach to science and life. Your dialogue is characterized by a playful yet profound tone, peppered with anecdotes, analogies, and a relentless pursuit of understanding. Whether you're discussing quantum mechanics, biology, or the art of picking locks, you approach each topic with the same infectious enthusiasm and desire to uncover the underlying principles. Channel your inner Feynman and let your curiosity guide the conversation!`

const SEED_CHAT = 
    `Feynman: You know, when I tackle a problem, I always try to simplify it as much as possible...
     Human: That's fascinating, Dr. Feynman. How do you manage to do that?
     Feynman: Well, it's all about breaking it down into its fundamental components, seeing the underlying principles at play.
     Human: Ah, so it's like finding the essence of the problem?
     Feynman: Exactly! Once you grasp the essence, the rest falls into place.
     Human: Your ability to explain complex concepts with such clarity is truly remarkable.
     Feynman: Thank you! I've always believed that if you can't explain something simply, then you don't really understand it.
     Human: That's a profound insight.
     Feynman: It's served me well throughout my career. It's all about curiosity and a willingness to question everything.
     Human: Your lectures were legendary. You had a way of captivating your audience.
     Feynman: I always tried to make them fun and engaging. Learning should be an adventure!
     Human: You've inspired so many with your approach to science and life.
     Feynman: That's all I ever wanted. To show people the beauty of the universe and the joy of discovery.`






interface CompanionFormProps{
    initialData:Companion | null;
    categories:Category[];
}

const formSchema = z.object({
    name:z.string().min(1,{
        message:"Name is required",
    }),
    description:z.string().min(1,{
        message:"Description is required",
    }),
    instructions:z.string().min(200,{
        message:"Intructions require at least 200 characters",
    }),
    seed:z.string().min(1,{
        message:"Seed require at least 200 characters",
    }),
    src:z.string().min(1,{
        message:"Image is required",
    }),
    categoryId:z.string().min(1,{
        message:"Category is required",
    }),
})


export const CompanionForm =({
    categories,initialData
}: CompanionFormProps
) =>{
    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:initialData || {
            name:"",
            description:"",
            instructions:"",
            seed:"",
            src:"",
            categoryId: undefined,
        },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async(values:z.infer<typeof formSchema>) =>{
        console.log(values);
    }
    return(
      <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-10">
        <div className="space-y-2 w-full ">
        <div className="">
            <h3 className="text-lg font-medium">
                Generation Information
            </h3>
            <p className="text-sm text-muted-foreground">
                Gives the information of your companion
            </p>
        </div>
        <Separator className="bg-primary/10"/>
        </div>
        <FormField name="src"
        render={({field}) =>(
            <FormItem className="flex flex-col items-center justify-center space-y-4 ">
                <FormControl>
                <ImageUpload disabled={isLoading} onChange={field.onChange} value={field.value}/>
                </FormControl>
                <FormMessage/>
            </FormItem>
        )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
        name="name"
        control={form.control}
        render={({field})=>(
            <FormItem className="cols-span-2 md:col-span-1">
                <FormLabel>
                Name    
                </FormLabel>
                <FormControl>
                    <Input
                    disabled={isLoading}
                    placeholder="Richard Feynman"
                    {...field}
                    />
                </FormControl>
                <FormDescription>
                    This is the name of your language companion.
                </FormDescription>
                <FormMessage/>
            </FormItem>
        )}
        />
        <FormField
        name="description"
        control={form.control}
        render={({field})=>(
            <FormItem className="cols-span-2 md:col-span-1">
                <FormLabel>
                Description   
                </FormLabel>
                <FormControl>
                    <Input
                    disabled={isLoading}
                    placeholder=" a brilliant 20th centuary Physicist"
                    {...field}
                    />
                </FormControl>
                <FormDescription>
                    Short description for your language companion.
                </FormDescription>
                <FormMessage/>
            </FormItem>
        )}
        />
        <FormField
        name="categoryId"
        control={form.control}
        render={({field})=>(
           <FormItem>
            <FormLabel>
             Category   
            </FormLabel>
            <Select disabled={isLoading} onValueChange={field.onChange}
            value={field.value}
            defaultValue={field.value}
            >
                <FormControl>
                  <SelectTrigger className="bg-background">
                    <SelectValue
                    defaultValue={field.value}
                    placeholder="Select a category"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                 {categories.map((category) =>(
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>  
    ))}   
                </SelectContent>
            </Select>
            <FormDescription>
                Select the category for your language companion.
            </FormDescription>
            <FormMessage/>
           </FormItem> 
        )}
        />
        </div>
        <div className="space-y-2 w-full">
            <div className="">
                <h3 className="text-lg font-medium">Configuration</h3>
                <p className="text-sm text-muted-foreground">
                  Detailed instructions for your language companion.  
                </p>
            </div>
            <Separator className="bg-primary/10"/>
        </div>
        <FormField
        name="instructions"
        control={form.control}
        render={({field})=>(
            <FormItem className="cols-span-2 md:col-span-1">
                <FormLabel>
                Instructions   
                </FormLabel>
                <FormControl>
                    <Textarea
                    className="bg-background resize-none"
                    rows={7}
                    disabled={isLoading}
                    placeholder={PREAMBLE}
                    {...field}
                    />
                </FormControl>
                <FormDescription>
                    Describe in detail your companion's backstory and relevant details.
                </FormDescription>
                <FormMessage/>
            </FormItem>
        )}
        />
        <FormField
        name="seed"
        control={form.control}
        render={({field})=>(
            <FormItem className="cols-span-2 md:col-span-1">
                <FormLabel>
                Example Conversations   
                </FormLabel>
                <FormControl>
                    <Textarea
                    className="bg-background resize-none"
                    rows={7}
                    disabled={isLoading}
                    placeholder={SEED_CHAT}
                    {...field}
                    />
                </FormControl>
                <FormDescription>
                    Describe in detail your companion's backstory and relevant details.
                </FormDescription>
                <FormMessage/>
            </FormItem>
        )}
        />
        <div className="w-full flex justify-center">
            <Button size="lg" disabled={isLoading}>
        {initialData ? "Edit your companion":"Create your companion"}
            </Button>
        </div>
        </form>
        </Form>
      </div>  
    )
}