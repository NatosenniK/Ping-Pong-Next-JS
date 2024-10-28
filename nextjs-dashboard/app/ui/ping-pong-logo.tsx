import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { roboto } from '@/app/ui/fonts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTableTennis, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link';

interface PingPongLogoProps {
	isSideBar?: boolean
}

export default function PingPongLogo(props: PingPongLogoProps) {
  return (

      <Link href="/" className={`flex flex-row items-center leading-none text-white`}>
        <FontAwesomeIcon icon={faTableTennis} className="fa-fw" size={!props.isSideBar ? `4x` : '8x'} />
        {!props.isSideBar &&  <p className={` ${roboto.className} text-[30px] hidden lg:block pl-2`}>Ping Pong Rankings</p>}
      </Link>

  );
}
