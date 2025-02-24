const Meta = ({
  title = "Welcome to FakeEvents",
  description = "We sell fake events",
  keywords = "fake, events, not real, buy fake events",
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
