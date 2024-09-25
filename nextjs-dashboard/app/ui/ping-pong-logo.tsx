import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTableTennis, faThumbsUp } from '@fortawesome/free-solid-svg-icons'

interface PingPongLogoProps {
	isSideBar?: boolean
}

export default function PingPongLogo(props: PingPongLogoProps) {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    > 
      <FontAwesomeIcon icon={faTableTennis} className="fa-fw" size={!props.isSideBar ? `4x` : '8x'} />
      {!props.isSideBar &&  <p className="text-[40px]">Ping Pong Rankings</p>}
    </div>
  );
}
