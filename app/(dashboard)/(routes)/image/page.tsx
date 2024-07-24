"use client";
import axios from "axios";
import * as z from "zod";
import { Bot, ImageIcon } from "lucide-react";
import { Heading } from "@/components/heading";
import { useForm } from "react-hook-form";
import { amountOptions,formSchema, resolutionOptions } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import OpenAI from "openai";
import dotenv from "dotenv";
import { Empty } from "@/components/empty";
import { loader as Loader } from "@/components/loader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Update your OpenAI API client configuration
dotenv.config();
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_API_KEY, dangerouslyAllowBrowser: true 
});

const ImagePage = () => {
  const router = useRouter();
  const [Images,setImages] = useState<string[]>([]);


  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution:"512x512"
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: { prompt: string; }) => {
    try {
    
      
      // const response = await openai.chat.completions.create({
      //   model: "gpt-3.5-turbo", // or gpt-4
      //   content: [userMessage],
      // });

     
    setImages([]);
    console.log(values);
    
//     const response = await axios.post("/api/image",values);
 
// const urls= response.data.map((image:{url:string})=>image.url);
//     setImages(urls);
//      form.reset();
    } catch (error) {
      console.error(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Image Generation"
        description="Turn your prompt into an image."
        icon={ImageIcon}
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2">
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="Pass what would you like to generate as picture?"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-5">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                      >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value}/>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {amountOptions.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

               <FormField
                control={form.control}
                name="resolution"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-5">
                   <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                    >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value}/>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {resolutionOptions.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          >
                          {option.label}
                          </SelectItem>
                      ))}
                    </SelectContent>
                   </Select>
                  </FormItem>
                )}
                />
               
              <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-20">
              <Loader/>
            </div>
          )}
          {Images.length === 0 && !isLoading && (
            <div>
              <Empty label="No images generated."/>
            </div>
          )}
          <div>
            Images will be rendered here.
          </div>
           
        </div>
      </div>
    </div>
  );
};

export default ImagePage;

 