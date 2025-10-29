import ComponentCard from '../../components/common/ComponentCard';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';
import PageMeta from '../../components/common/PageMeta';
import { EventIcon } from '@/icons';
import Event from '@/components/dashboard/events/Event';

const EventsPage = () => {
  return (
    <>
      <PageMeta title="Events | GCCC Ibadan" />
      <PageBreadcrumb
        icon={EventIcon}
        pageTitle="Events"
        description={
          'Join us for life - changing encounters and spiritual growth opportunities'
        }
      />
      <ComponentCard>
        <Event />
      </ComponentCard>
    </>
  );
};

export default EventsPage;
