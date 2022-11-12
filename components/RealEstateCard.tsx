import Image from "next/image";
import { IRealEstate } from "../types";
type Props = { product: IRealEstate };

const RealEstateCard = (props: Props) => {
	return (
		<li>
			<div className="relative w-full h-72">
				<Image
					src={props.product.images[0]}
					layout="fill"
					alt={"Real estate photo"}
				/>
			</div>
			<h2>{props.product.name}</h2>
			<h3>{props.product.location}</h3>
			<h4>{`${props.product.price} Kč`}</h4>
		</li>
	);
};

export default RealEstateCard;
