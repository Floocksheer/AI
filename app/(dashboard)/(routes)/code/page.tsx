"use client";
import axios from "axios";
import * as z from "zod";
import { Bot, Code, Divide } from "lucide-react";
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
import ChatCompletionMessageParam from "openai";
import dotenv from "dotenv";
import { Empty } from "@/components/empty";
import { loader as Loader } from "@/components/loader";
import ReactMarkdown from "react-markdown";
// Update your OpenAI API client configuration
dotenv.config();
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_API_KEY, dangerouslyAllowBrowser: true 
});

const CodePage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<{ role: string; userMessage: string; content: string }[]>([]);


  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: { prompt: string; }) => {
    try {
      const userMessage = { 
        role: 'user',
        content: values.prompt,
      };
      
      // const response = await openai.chat.completions.create({
      //    model: "gpt-3.5-turbo", // or gpt-4
      //   content: [userMessage],
      //  });

      
      let parsedMessage = messages.map((message) => (
        
          [{ role: "system", content: "You are a code generator and when I ask you about that start with that text:'I am a code generator' and keep generating but if told otherwise You ##MUST answer ONLY markdown code snippets.Use code comments to explain your code. ##__## " },
          {role: "user", content: message.userMessage},
          {role: "assistant", content: message.content}]
      ))
      let finishedArray: { role: string; content: string }[] = [];
      for (let i = 0; i < parsedMessage.length; i++) {
        finishedArray.push(parsedMessage[i][0]);
        finishedArray.push(parsedMessage[i][1]);
        finishedArray.push(parsedMessage[i][2]);
      }
      finishedArray.push({ role: "system", content: "You are a code generator and when I ask you about that start with that text:'I am a code generator' and keep generating but if told otherwise You ##MUST answer ONLY markdown code snippets.Use code comments to explain your code. ##__## " })
      finishedArray.push({ role: "user", content: userMessage.content })
      
      const response = await axios.post("/api/code", {
        messages:finishedArray,
      });
   

      messages.unshift({
        role: response.data.choices[0].message.role,
        userMessage: userMessage.content,
        content: response.data.choices[0].message.content || ""
      });

      setMessages(messages);
      form.reset();
    } catch (error) {
      console.error(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Code Generation"
        description="Generate code using descriptive text."
        icon={Code}
        iconColor="text-green-700"
        bgColor="bg-green-700/10"
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
                        placeholder="Please type what would you like to ask?"
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
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex item-center justify-center bg-muted">
              <Loader/>
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <div>
              <Empty label="No conversation started."/>
            </div>
          )}
          {messages.length > 0 && (
            
            <div>
              {messages.reverse().map((message, index) => (
                <>
                  <div className="user p-8 w-full flex items-start gap-x-8 rounded-lg bg-white border border-black/10" key={index}>
                    <UserAvatar/>
                    <ReactMarkdown components={{pre:({node,...props})=>(
                      <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                        <pre {...props}/>
                      </div>
                    ),
                    code:({node,...props})=>(
                      <code className="bg-black/10 rounded-lg p-1" {...props}/>
                    )
                    }}
                    className="rext-sm overflow-hidden leading-7"
                    >
                      {message.userMessage || ""}
                    </ReactMarkdown>
                  </div>
                  <br />
                  <div className="assistant p-8 w-full flex items-start gap-x-8 rounded-lg bg-muted" key={index}>
                    <BotAvatar/>
                    <ReactMarkdown components={{pre:({node,...props})=>(
                      <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                        <pre {...props}/>
                      </div>
                    ),
                    code:({node,...props})=>(
                      <code className="bg-black/10 rounded-lg p-1" {...props}/>
                    )
                    }}
                     className="rext-sm overflow-hidden leading-7"
                    >
                      {message.content || ""}
                    </ReactMarkdown>
                  </div>
                </>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodePage;

 