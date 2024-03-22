'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Element } from 'react-scroll';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { Text } from 'rizzui';
import cn from '@/utils/class-names';
import FormNav, {
    formParts,
} from './form-nav';
import ProductSummary from './product-summary';
import { defaultValues } from './form-utils';
import ProductMedia from './product-media';
import ProductTags from './product-tags';
import FormFooter from '@/components/form-footer';
import {
    CreateProductInput,
    productFormSchema,
} from '@/utils/validators/create-product.schema';
import usePost from "@/hooks/use-post";
import {getAccountsByClient} from "@/lib/apiRequests/account";
import {IGetAccountsByClientResponse} from "@/types";

const MAP_STEP_TO_COMPONENT = {
    [formParts.media]: ProductMedia,
    [formParts.summary]: ProductSummary,
    [formParts.tagsAndCategory]: ProductTags,

};

interface IndexProps {
    slug?: string;
    className?: string;
    post?: CreateProductInput;
}

export default function CreateEditPost({
    slug,
    post,
    className,
}: IndexProps, { params }: { params: { clientId: string } }) {
    const [isLoading, setLoading] = useState(false);
    const methods = useForm<CreateProductInput>({
        resolver: zodResolver(productFormSchema),
        defaultValues: defaultValues(post),
    });
    const { createPost } = usePost();

    const onSubmit: SubmitHandler<CreateProductInput> = (data) => {
        setLoading(true);

        getAccountsByClient({clientId: params.clientId}).then((response: IGetAccountsByClientResponse) => {
            if (response.statusText === 'OK' && response.data.data){
                const accountId = response.data.data[0].id || '';
                createPost({
                    accountId: accountId,
                    description: data.description || '',
                    image_url: data.imageUrl ? data.imageUrl[0].url : '',
                    location: data.location || '',
                    tags: data.tags || [],
                    postSchedule: data.postSchedule || new Date()
                }).then(() => { setLoading(false); });
            } else {
                toast.error(response.data.message)
            }
        });
    };

    return (
        <div className="@container">
            <FormNav />
            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className={cn(
                        'relative z-[19] [&_label.block>span]:font-medium',
                        className
                    )}
                >
                    <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
                        {Object.entries(MAP_STEP_TO_COMPONENT).map(([key, Component]) => (
                            <Element
                                key={key}
                                name={formParts[key as keyof typeof formParts]}
                            >
                                {<Component className="pt-7 @2xl:pt-9 @3xl:pt-11" />}
                            </Element>
                        ))}
                    </div>

                    <FormFooter
                        isLoading={isLoading}
                        submitBtnText={slug ? 'Update Post' : 'Create Post'}
                    />
                </form>
            </FormProvider>
        </div>
    );
}
