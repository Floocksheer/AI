"use client";
import axios from "axios";
import * as z from "zod";
import { Bot, VideoIcon } from "lucide-react";
import { Heading } from "@/components/heading";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
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
import { useProModal } from "@/hooks/use-pro-modal";
// Update your OpenAI API client configuration
dotenv.config();
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_API_KEY, dangerouslyAllowBrowser: true 
});

const VideoPage = () => {
  const proModal=useProModal();
  const router = useRouter();
  const [video, setVideo] = useState<string>();


  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: { prompt: string; }) => {
    try {
      
      
      // const response = await openai.chat.completions.create({
      //   model: "gpt-3.5-turbo", // or gpt-4
      //   content: [userMessage],
      // });
        setVideo(undefined);
      
    
    const response = await axios.post("/api/video",values );
 
    
 

    
      setVideo(response.data[0]);
      form.reset();
    } catch (error:any) {
      if(error?.response?.status===403){
        proModal.onOpen();
    }
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Video Generation"
        description="Turn your prompt into video."
        icon={VideoIcon}
        iconColor="text-orange-700"
        bgColor="bg-orange-700/10"
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
                        placeholder="Which video you are looking for?"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4 ">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex item-center justify-center bg-muted">
              <Loader/>
            </div>
          )}
          {!video && !isLoading && (
            <div>
              <Empty label="No video generated."/>
            </div>
          )}
        {video && (
          <video className="w-full aspect-video mt-8 rounded-lg border bg-black" controls>
            <source src={video}/>

          </video>
        )}
        </div>
      </div>
    </div>
  );
};

export default VideoPage;

 