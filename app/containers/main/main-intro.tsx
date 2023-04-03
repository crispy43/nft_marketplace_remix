import type { Properties } from 'csstype';
import { useTranslation } from 'react-i18next';

export default function MainIntro() {
  const { t } = useTranslation();

  return (
    <>
      {/* 백그라운드 이미지 영역 */}
      <div
        style={{
          display: 'block',
          position: 'absolute',
          zIndex: '0',
          width: '1920px',
          height: 'height: calc(100vh - var(--desktop-header-height))',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          overflowX: 'clip',
        } as Properties}
      >
        <img
          src="/images/intro/intro-01.png"
          alt=""
          style={{
            position: 'absolute',
            top: '26px',
            left: '-50px',
          } as Properties}
        />
        <img
          src="/images/intro/intro-02.png"
          alt=""
          style={{
            position: 'absolute',
            top: '164px',
            left: '64px',
          } as Properties}
        />
        <img
          src="/images/intro/intro-03.png"
          alt=""
          style={{
            position: 'absolute',
            top: '68px',
            left: '538px',
          } as Properties}
        />
        <img
          src="/images/intro/intro-04.png"
          alt=""
          style={{
            position: 'absolute',
            top: '226px',
            left: '1071px',
          } as Properties}
        />
        <img
          src="/images/intro/intro-05.png"
          alt=""
          style={{
            position: 'absolute',
            top: '49px',
            left: '1290px',
            overflowX: 'hidden',
          } as Properties}
        />
        <img
          src="/images/intro/intro-06.png"
          alt=""
          style={{
            position: 'absolute',
            top: '109px',
            left: '1555px',
            overflowX: 'hidden',
          } as Properties}
        />
        <img
          src="/images/intro/intro-07.png"
          alt=""
          style={{
            position: 'absolute',
            top: '439px',
            left: '1675px',
            overflowX: 'hidden',
          } as Properties}
        />
        <img
          src="/images/intro/intro-08.png"
          alt=""
          style={{
            position: 'absolute',
            top: '614px',
            left: '179px',
          } as Properties}
        />
        <img
          src="/images/intro/intro-09.png"
          alt=""
          style={{
            position: 'absolute',
            top: '688px',
            left: '700px',
          } as Properties}
        />
        <img
          src="/images/intro/intro-10.png"
          alt=""
          style={{
            position: 'absolute',
            top: '624px',
            left: '1254px',
          } as Properties}
        />
      </div>

      {/* 텍스트 영역 */}
      <div
        style={{
          display: 'flex',
          position: 'relative',
          zIndex: '10',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        } as Properties}
        data-view='device-with-header'
      >
        <div
          style={{
            height: '180px'
          } as Properties}
        >
          <h1
            style={{
              fontSize: '120px',
              fontWeight: '400',
              lineHeight: '1',
            } as Properties}
          >
            <span
              style={{
                fontWeight: '700',
              } as Properties}
            >
              나의 일상
            </span>
            <span>
              에서 발견하는
            </span>
          </h1>
        </div>
        <div
          style={{
            height: '160px',
          } as Properties}
        >
          <h1
            style={{
              fontSize: '120px',
              fontWeight: '400',
              lineHeight: '1',
              padding: '20px 22.5px',
              backgroundColor: 'var(--color-black)',
              color: 'var(--color-white)',
            } as Properties}
          >
            <span
              style={{
                fontWeight: '700',
              } as Properties}
            >
              대체 불가능
            </span>
            <span>
              한 가치
            </span>
          </h1>
        </div>
      </div>
    </>
  );
}
