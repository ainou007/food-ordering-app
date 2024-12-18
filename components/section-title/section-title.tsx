type SectionTitleProps = { title: string; subTitle: string };
const SectionTitle = ({ title, subTitle }: SectionTitleProps) => {
  return (
    <>
      <h2 className="text-center text-3xl font-bold uppercase text-primary">
        {title}
      </h2>
      <p className="mb-8 text-center text-sm uppercase tracking-[5px] text-muted-foreground">
        {subTitle}
      </p>
    </>
  );
};
export default SectionTitle;
