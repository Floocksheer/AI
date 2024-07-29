"use client";
import axios from "axios";
import * as z from "zod";
import { Bot, Music } from "lucide-react";
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

const MusicPage = () => {
  const proModal=useProModal();
  const router = useRouter();
  const [music, setMusic] = useState<string>();


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
        setMusic(undefined);
      
    
    const response = await axios.post("/api/music",values );
 
    
 

    
      setMusic(response.data.audio);
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
        title="Music Generation"
        description="Turn your prompt into music."
        icon={Music}
        iconColor="text-emerald-500"
        bgColor="bg-emerald-500/10"
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
                        placeholder="Which music you are looking for?"
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
          {!music && !isLoading && (
            <div>
              <Empty label="No music generated."/>
            </div>
          )}
        {music && (
          <audio controls className="w-full mt-8">
            <source src={music}/>
            </audio>
        )}
        </div>
      </div>
    </div>
  );
};

export default MusicPage;

 