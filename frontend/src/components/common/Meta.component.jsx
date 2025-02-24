const Meta = ({
  title = "Welcome to FakeShop",
  description = "We sell fake stuff",
  keywords = "fake, stuff, not real, buy fake stuff",
}) => {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </>
  );
};

export default Meta;
