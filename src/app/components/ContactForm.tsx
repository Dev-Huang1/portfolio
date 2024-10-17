"use client";

import MotionDiv from "./MotionDiv";
import { slideInFromRight } from "../utils/motion";
import { Send } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SectionLabel from "./SectionLabel";
import { sendMail } from "../utils/sendMail";
import { toast } from "sonner";

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    message: z.string().min(10, {
        message: "Message must be at least 10 characters.",
    }),
});

export default function ContactForm() {
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // setIsLoading(true);
        // const response = await sendMail(
        //     values.name,
        //     values.email,
        //     values.message
        // );
        // setIsLoading(false);

        const response = {
            success: false,
            message: "Email sent successfully",
        };

        if (response && response.success) {
            toast.success(response.message, {
                description: "Your message has been sent. I will get back to you as soon as possible.",
                duration: 5000,
                classNames: {
                    icon: "text-green-500",
                    toast: "bg-background text-slate-100 border-slate-900",
                    description: "text-slate-350",
                    
                }
            });
        } else if (response && !response.success) {
            toast.error(response.message, {
                description: "Please try again later.",
                duration: 5000,
                classNames: {
                    icon: "text-red-600",
                    toast: "bg-background text-slate-100 border-slate-900",
                    description: "text-slate-350",
                    
                }
            });
        }
        form.reset();
    }

    return (
        <MotionDiv
            variants={slideInFromRight(1.4)}
            initial="hidden"
            animate="visible"
            className="lg:pl-6 w-full"
        >
            <section className="w-full text-sm" id="contact">
                <SectionLabel label="CONTACT" />
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="grid grid-cols-2 gap-4"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-100 text-xs">
                                        Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="John Doe"
                                            {...field}
                                            className="bg-[rgba(255,255,255,0.01)] border-[rgba(255,255,255,0.1)] text-white text-xs p-2 rounded-sm focus:ring-orange-500"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-100 text-xs">
                                        Email
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="aurora@studioaurora.io"
                                            {...field}
                                            className="bg-[rgba(255,255,255,0.01)] border-[rgba(255,255,255,0.1)] text-white text-xs p-2 rounded-sm focus:ring-orange-500"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem className="col-span-2">
                                    <FormLabel className="text-slate-100 text-xs">
                                        Message
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="I want to request a quote for a new website design..."
                                            {...field}
                                            className="bg-[rgba(255,255,255,0.01)] border-[rgba(255,255,255,0.1)] text-white text-xs p-2 rounded-sm focus:ring-orange-500 w-full"
                                            rows={4}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                        <div className="col-span-2 flex justify-start">
                            <Button
                                type="submit"
                                className="bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-500 hover:to-pink-500 dark:text-white text-xs px-4 py-2 rounded-sm w-full"
                                disabled={isLoading}
                            >
                                {isLoading ? "SENDING..." : "SEND MESSAGE"}
                                <Send className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </form>
                </Form>
            </section>
        </MotionDiv>
    );
}