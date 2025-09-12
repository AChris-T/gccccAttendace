import { HelmetProvider, Helmet } from "react-helmet-async";

const PageMeta = ({
  title,
  description,
}) => (
  <Helmet>
    <title>{title}</title>
    {description && <meta name="description" content={description} />}
  </Helmet>
);

export const AppWrapper = ({ children }) => (
  <HelmetProvider>{children}</HelmetProvider>
);

export default PageMeta;
