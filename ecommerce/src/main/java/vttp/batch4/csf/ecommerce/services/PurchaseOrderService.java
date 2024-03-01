package vttp.batch4.csf.ecommerce.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import vttp.batch4.csf.ecommerce.models.Order;
import vttp.batch4.csf.ecommerce.repositories.PurchaseOrderRepository;

@Service
public class PurchaseOrderService {

  @Autowired
  private PurchaseOrderRepository poRepo;

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  // You may only add Exception to the method's signature
  public String createNewPurchaseOrder(Order order) {
    // TODO Task 3
    
    return poRepo.create(order);
    }
}
