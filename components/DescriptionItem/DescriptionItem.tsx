import { FC } from "react";

type Props = {
    title: string;
    content: string
  }

const DescriptionItem: FC<Props>  = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
      <p className="site-description-item-profile-p-label"><strong>{title}:</strong></p>
      {content}
    </div>
  );

  export default DescriptionItem