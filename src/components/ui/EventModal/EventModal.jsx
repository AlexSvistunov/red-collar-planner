import { useEffect } from "react";
import { URL } from "../../../api/url";
import { useAuth } from "../../../hooks/useAuth";
import styles from "./EventModal.module.scss";

const EventModal = ({isModalActive, setIsModalActive, item}) => {
  const { isAuth, token } = useAuth();

  console.log(item);

  const getEventsForPublic = async () => {
    try {
      const response = await fetch(`${URL}/api/events?populate=*&filters[dateStart][$gte]=2022-10-14T14:00:00.000Z&filters[dateStart][$lte]=2024-10-14T14:00:00.000Z`)

      const data = await response.json()
    
    } catch (error) {
      console.log(error);
    }
  }

  const getEventsForAuth = async () => {
    try {
      const response = await fetch(`${URL}/api/events?populate=*&filters[dateStart][$gte]=2022-10-14T14:00:00.000Z&filters[dateStart][$lte]=2024-10-14T14:00:00.000Z`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const data = await response.json()
    } catch (error) {
      console.log(error);
    }
  }

  const getMe = async () => {
    try {
      const response = await fetch(`${URL}/api/users/me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const data = await response.json()
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getEventsForPublic()
    getEventsForAuth()
    getMe()
  }, [])

  return (
    <div className={isModalActive ? 'modal modal--active' : 'modal'}>
      <div className={styles.Content}>
        {item && <div className={styles.ContentWrapper}>
          <h2 className={styles.ContentTitle}>{item.title}</h2>

          <div className={styles.ContentBlock}>
            <div className={styles.ContentInfo}>
              {item.dateStart}
              {item.location}
            </div>
            <div className={styles.ContentDescr}>{item.description}</div>
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
        </div>}
      </div>
    </div>
  );
};

export default EventModal;
