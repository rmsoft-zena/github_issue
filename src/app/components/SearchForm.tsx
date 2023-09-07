"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchKeyword } from "@/store/searchKeywordStore";

const formSchema = z.object({
  title: z.string().trim(),
});

export default function SearchForm() {
  const { setSearchKeyword } = useSearchKeyword();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = (value: z.infer<typeof formSchema>) => {
    setSearchKeyword(value.title);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="title..."
                  {...field}
                  className="w-52 h-fit rounded-xl border-zinc-300 text-zinc-500 px-4 shadow-lg"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          variant="outline"
          className="rounded-xl bg-zinc-200 border-none hover:bg-zinc-300 transition-all duration-300"
        >
          search
        </Button>
      </form>
    </Form>
  );
}
