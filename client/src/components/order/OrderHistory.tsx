import { useState, useContext, useEffect, ComponentType } from 'react';
import { Link } from 'react-router';
import OrderSummary from './OrderSummary';
import {
  Package,
  ShoppingBag,
  Clock,
  Truck,
  CheckCircle2,
  XCircle,
  LucideProps,
} from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import type { Order } from '../../types/order';
import apiClient from '../../apiClient';
import { getOrderStatus, type OrderStatus } from './orderStatus';
import '../../styles/order.css';

type FilterType = 'all' | OrderStatus;

type FilterConfig = {
  label: string;
  value: FilterType;
  icon: ComponentType<LucideProps>;
};

export default function OrderHistory() {
  const { state } = useContext(AuthContext);
  const userInfo = state.userInfo;
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userInfo?._id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data } = await apiClient.get(`/orders?user=${userInfo._id}`);
        setOrderHistory(data);
      } catch (err) {
        console.error('Error while loading orders:', err);
        setOrderHistory([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userInfo]);

  useEffect(() => {
    setVisibleCount(3);
  }, [activeFilter]);

  // Filter orders based on active filter
  const filteredOrders = orderHistory.filter((order) => {
    if (activeFilter === 'all') return true;

    const status = getOrderStatus(order);
    return status === activeFilter;
  });

  // Only show visibleCount amount of orders in the beginning
  const visibleOrders = filteredOrders.slice(0, visibleCount);
  const canShowMore = visibleCount < filteredOrders.length;

  // Get filter counts
  const getFilterCount = (filter: FilterType) => {
    if (filter === 'all') return orderHistory.length;
    return orderHistory.filter((order) => getOrderStatus(order) === filter).length;
  };

  const filters: FilterConfig[] = [
    { label: 'Alle', value: 'all', icon: Package },
    { label: 'Ausstehend', value: 'pending', icon: Clock },
    { label: 'In Bearbeitung', value: 'processing', icon: Truck },
    { label: 'Versendet', value: 'shipped', icon: Truck },
    { label: 'Zugestellt', value: 'delivered', icon: CheckCircle2 },
    { label: 'Storniert', value: 'cancelled', icon: XCircle },
  ];

  // Loading State
  if (loading) {
    return (
      <div className="order-history-container">
        <div className="order-history-header">
          <h2 className="order-history-title" style={{ fontSize: '30px' }}>
            Meine Bestellungen
          </h2>
        </div>
        <div className="order-history-loading">
          <div className="loading-spinner" />
          <p className="loading-text">Bestellungen werden geladen...</p>
        </div>
      </div>
    );
  }

  // Empty State
  if (!orderHistory.length) {
    return (
      <div className="order-history-container">
        <div className="order-history-header">
          <h2 className="order-history-title" style={{ fontSize: '30px' }}>
            Meine Bestellungen
          </h2>
          <p className="order-history-subtitle">Übersicht über alle deine bisherigen Käufe</p>
        </div>
        <div className="order-history-empty">
          <div className="empty-icon-wrapper">
            <ShoppingBag className="empty-icon" />
          </div>
          <h3 className="empty-title">Noch keine Bestellungen</h3>
          <p className="empty-text">
            Du hast noch keine Bestellungen aufgegeben. Entdecke unsere Produkte und starte deine
            HandyDetox-Reise!
          </p>
          <Link to="/produkte" className="empty-button">
            <ShoppingBag size={20} />
            Jetzt einkaufen
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="order-history-container">
      {/* Header */}
      <div className="order-history-header">
        <div className="order-history-title" style={{ fontSize: '30px' }}>
          Meine Bestellungen
        </div>
        <p className="order-history-subtitle">
          {orderHistory.length} {orderHistory.length === 1 ? 'Bestellung' : 'Bestellungen'}{' '}
          insgesamt
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="order-filter-tabs">
        {filters.map((filter) => {
          const count = getFilterCount(filter.value);
          const Icon = filter.icon;

          if (count === 0 && filter.value !== 'all') return null;

          return (
            <button
              key={filter.value}
              className={`filter-tab ${activeFilter === filter.value ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.value)}
            >
              <Icon size={16} />
              {filter.label}
              <span className="filter-tab-count">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Orders List */}
      {filteredOrders.length > 0 ? (
        <>
          <div className="order-history-list">
            {visibleOrders.map((order) => (
              <OrderSummary key={order._id} order={order} />
            ))}
          </div>
          {canShowMore && (
            <div className="order-history-more">
              <button
                className="load-more-button"
                onClick={() => setVisibleCount((prev) => prev + 3)}
              >
                3 weitere Bestellungen anzeigen
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="order-history-empty">
          <div className="empty-icon-wrapper">
            <Package className="empty-icon" />
          </div>
          <h3 className="empty-title">Keine Bestellungen gefunden</h3>
          <p className="empty-text">Es gibt keine Bestellungen in dieser Kategorie.</p>
        </div>
      )}
    </div>
  );
}
