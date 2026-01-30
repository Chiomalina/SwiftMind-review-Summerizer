import type { KeyboardEvent } from 'react';
import { Button } from '../ui/button';
import { FaArrowUp } from 'react-icons/fa';
import { useForm } from 'react-hook-form';

export type ChatFormData = {
   prompt: string;
};

type Props = {
   onSubmit: (data: ChatFormData) => void;
};

const ChatInput = ({ onSubmit }: Props) => {
   // Destructure toolboxes to be used in useForm before accessing them.
   const { register, handleSubmit, reset, formState } = useForm<ChatFormData>();

   const submit = handleSubmit((data) => {
      // reseting the text area to empty
      reset({ prompt: '' });
      onSubmit(data);
   });

   const handleKeydown = (e: KeyboardEvent<HTMLFormElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault();
         submit();
      }
   };
   return (
      <form
         onSubmit={submit}
         onKeyDown={handleKeydown}
         // Scrolling effect
         className="mt-4 mr-3 mb-4 flex flex-col gap-2 items-end border-2 p-4 rounded-3xl"
      >
         <textarea
            // ... allows spreading all methods from register
            {...register('prompt', {
               // disable submission on empty form
               required: true,
               // Ensure form submission arrow is disabled on white spaces and 0 length
               validate: (data) => data.trim().length > 0,
            })}
            autoFocus
            className="w-full border-0 focus:outline-0 resize-none"
            placeholder="Ask anything"
            maxLength={1000}
         />
         <Button disabled={!formState.isValid} className="rounded-full w-9 h-9">
            <FaArrowUp />
         </Button>
      </form>
   );
};

export default ChatInput;
