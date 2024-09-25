import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTableTennis, faThumbsUp } from '@fortawesome/free-solid-svg-icons'

export default function PingPongLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    > 
      <FontAwesomeIcon icon={faTableTennis} className="fa-fw" size='4x' />
      <p className="text-[40px]">Ping Pong Rankings</p>
    </div>
  );
}
