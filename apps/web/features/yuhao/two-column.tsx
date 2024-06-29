import Image from 'next/image';
import styles from './two-columns.module.css';

interface Image {
  id: string;
  alt?: string;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  createdAt: string;
  updatedAt: string;
  url: string;
}

interface TwoColumnsItem {
  title: string;
  description: string;
  image: Image;
  id: string;
}

export interface TwoColumnsBlock {
  title: string;
  description: string;
  items: TwoColumnsItem[];
  layout: string;
  id: string;
  blockType: 'two-columns';
}



const TwoColumnsItem = (item: TwoColumnsItem) => (
  <div className={styles.item}>
    <Image
      src={item.image.url}
      alt={item.image.alt || item.title}
      width={item.image.width}
      height={item.image.height}
      className={styles.image}
    />
    <h3 className={styles.itemTitle}>{item.title}</h3>
    <p className={styles.itemDescription}>{item.description}</p>
  </div>
);


const TwoColumns = (twoColumnsData: TwoColumnsBlock) => {
  const gridClass = twoColumnsData.layout === 'stacked' ? styles.stackedGrid : styles.grid;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>{twoColumnsData.title}</h2>
        <p className={styles.description}>{twoColumnsData.description}</p>
        <div className={gridClass}>
          {twoColumnsData.items.map((item) => (
            <TwoColumnsItem key={item.id} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TwoColumns;
