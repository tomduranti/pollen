export default function Separator() {
  return (
    <div className='flex items-center gap-3'>
      <div className='flex-1 h-px bg-(--color-border)' />
      <span className='text-sm text-[#6B7380] uppercase'>or</span>
      <div className='flex-1 h-px bg-(--color-border)' />
    </div>
  );
}
