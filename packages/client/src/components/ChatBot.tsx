import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { FaArrowUp } from 'react-icons/fa';

type FormData = {
   prompt: string;
};

function ChatBot() {
   // Destructure toolboxes to be used in useForm before accessing them.
   const { register, handleSubmit, reset, formState } = useForm<FormData>();

   const onSubmit = (data: FormData) => {
      console.log(data);
      // reseting the text area to empty
      reset();
   };

   const onKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault();
         handleSubmit(onSubmit)();
      }
   };

   return (
      <form
         onSubmit={handleSubmit(onSubmit)}
         onKeyDown={onKeyDown}
         className="mt-4 mr-3 flex flex-col gap-2 items-end border-2 p-4 rounded-3xl"
      >
         <textarea
            // ... allows spreading all methods from register
            {...register('prompt', {
               // disable submission on empty form
               required: true,

               // Ensure form submission arrow is disabled on white spaces and 0 length
               validate: (data) => data.trim().length > 0,
            })}
            className="w-full border-0 focus:outline-0 resize-none"
            placeholder="Ask anything"
            maxLength={1000}
         />
         <Button disabled={!formState.isValid} className="rounded-full w-9 h-9">
            <FaArrowUp />
         </Button>
      </form>
   );
}

export default ChatBot;
