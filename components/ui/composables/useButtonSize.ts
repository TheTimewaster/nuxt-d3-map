export default (
  size: MaybeRef<'sm' | 'lg'>,
  isIconOnly?: MaybeRef<boolean>
) => {
  const sizeClass = computed<string>(() => {
    const sizeRaw = unref(size);
    const isIconOnlyRaw = unref(isIconOnly);
    switch (sizeRaw) {
      case 'sm':
        if (isIconOnlyRaw) {
          return tw`py-2 px-2 leading-none`;
        }

        return tw`py-2 px-3 leading-none`;
      case 'lg':
        if (isIconOnlyRaw) {
          return tw`py-3 px-4`;
        }

        return tw`py-3 px-4`;
      default:
        return '';
    }
  });

  return sizeClass;
};
