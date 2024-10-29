import { Link } from "react-router-dom";
import "../../assets/css/PaymentFailPage.css";
import { ArrowLeft, RefreshCw, XCircleIcon } from "lucide-react";
export default function PaymentFail() {
  return (
    <div className="payment-fail-container">
      <div className="payment-fail-card">
        <XCircleIcon className="fail-icon" size={64} />
        <h1>Payment Failed</h1>
        <p>
          We're sorry, but your payment could not be processed at this time.
        </p>
        <div className="button-group">
          <Link to="/">
            <button className="back-button">
              <ArrowLeft size={20} />
              Go Back
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
