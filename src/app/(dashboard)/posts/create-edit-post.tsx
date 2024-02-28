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

const MAP_STEP_TO_COMPONENT = {
    [formParts.media]: ProductMedia,
    [formParts.summary]: ProductSummary,
    [formParts.tagsAndCategory]: ProductTags,

};

interface IndexProps {
    slug?: string;
    className?: string;
    product?: CreateProductInput;
}

export default function CreateEditPost({
    slug,
    product,
    className,
}: IndexProps) {
    const [isLoading, setLoading] = useState(false);
    const methods = useForm<CreateProductInput>({
        resolver: zodResolver(productFormSchema),
        defaultValues: defaultValues(product),
    });

    const onSubmit: SubmitHandler<CreateProductInput> = (data) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            console.log('product_data', data);
            toast.success(
                <Text as="b">Post successfully {slug ? 'updated' : 'created'}</Text>
            );
            methods.reset();
        }, 600);
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
