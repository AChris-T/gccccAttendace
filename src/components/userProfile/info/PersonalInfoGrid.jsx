import FieldItem from "./FieldItem";

const PersonalInfoGrid = ({ items }) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:gap-5">
    {items.map((field) => (
      <FieldItem
        key={field.label}
        Icon={field.icon}
        label={field.label}
        value={field.value}
        gradientClass={field.gradientClass}
        size="md"
      />
    ))}
  </div>
);

export default PersonalInfoGrid;
