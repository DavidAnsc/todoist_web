export async function handleShowError(errorBadge, setError) {
  setError(errorBadge);
  setTimeout(() => {
    setError(null);
  }, 3000);
}