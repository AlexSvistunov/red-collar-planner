import { useAuth } from "../../../hooks/useAuth";
import styles from "./EventModal.module.scss";

const EventModal = ({isModalActive, setIsModalActive}) => {
  const { isAuth } = useAuth();
  console.log(isAuth);
  return (
    <div className={isModalActive ? 'modal modal--active' : 'modal'}>
      <div className={styles.Content}>
        <div className={styles.ContentWrapper}>
          <h2 className={styles.ContentTitle}></h2>

          <div className={styles.ContentBlock}>
            <div className={styles.ContentInfo}></div>
            <div className={styles.ContentDescr}></div>
          </div>

          <div className={styles.Part}>
            <h3 className={styles.PartTitle}></h3>
            <div className={styles.PartList}>
              <div className={styles.PartItem}></div>
            </div>
          </div>

          <div className={styles.Gallery}>
            <h3 className={styles.GalleryTitle}></h3>
            {/* gallery */}
          </div>

          {isAuth ? <button>Присоединиться к событию</button> : <div>
            <button>Войдите,</button>
            чтобы присоединиться к событию
        </div>}
        </div>
      </div>
    </div>
  );
};

export default EventModal;
